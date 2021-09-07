import React,{useState,useCallback,useEffect} from 'react';
import {Container,Form,SubmitButton,List,DeleteButton} from './styles';
import {FaGithub,FaPlus,FaSpinner,FaBars,FaTrash} from 'react-icons/fa';
import api from '../../services/api';
import {Link} from 'react-router-dom';

export default function Main()
{
  const [newRepo,setNewRepo] =useState('');
  const [respositorios,setRepositorios] =useState([]);
  const [loading,setLoading] = useState(false);
  const [alert,setAlert] = useState(null);
  
  useEffect(()=>{
      const repoStorage = localStorage.getItem('repos');
      if(repoStorage)
      {
         setRepositorios(JSON.parse(repoStorage))
      }
  },[])



  useEffect(()=>{
      localStorage.setItem('repos',JSON.stringify(respositorios))
  },[respositorios])

   const handleSubmit =useCallback((e)=>
   {
    
    e.preventDefault();
    async function submit()
    {
        setLoading(true);
        setAlert(null);
       try
         {
             if(newRepo === '')
             {
                 throw new  Error('voce precisa indicar um repositorio');
             }
            const response = await api.get(`repos/${newRepo}`);
   
            const hasRepo = respositorios.find(repo => repo.name === newRepo);          
            if(hasRepo)
            {
              throw new Error('repositorio ja cadastrado');
            }
            
            const data = {
            name:response.data.full_name,
            }
            setRepositorios([...respositorios,data]);
            setNewRepo('');
         }
         catch(error)
         {
             console.log(error);
             setAlert(true);
         }
         finally
         {
           setLoading(false);
         }
   
    }
    submit();
        
   },[newRepo,respositorios])


  function hendleinputChange(e)
  {
   setNewRepo(e.target.value);
   setAlert(null);

  }

  const handleDelete = useCallback((repo)=>{
   const find = respositorios.filter(r => r.name !== repo);
   setRepositorios(find);
  },[respositorios]);

    return(
       <Container>
           <h1>
               <FaGithub size={25}/>
               meus repos
           </h1>
           <Form onSubmit={handleSubmit} error={alert}>
                 <input type="text" value={newRepo} onChange={hendleinputChange}placeholder="Adicionar Repositorio" />
                  
                  
                  <SubmitButton Loading={loading?1:0}>
                      {
                          loading?(<FaSpinner color="#FFF" size={25} />)
                          :(  <FaPlus color="#FFF" size={25} />)
                      }
                  </SubmitButton>
           </Form>
      
           <List>
               {
               respositorios.map(repo=>
                  <li key={repo.name}>
                      <span>
                          <DeleteButton onClick={()=>handleDelete(repo.name)}>
                            <FaTrash size={15}/>
                          </DeleteButton>
                          {repo.name}
                      </span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                        <FaBars size={20}/>
                      </Link>
                  </li>
               )
               }
           </List>
       </Container>
    )
}