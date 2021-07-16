import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades) {
 return (
   <Box as="aside">
     <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}} />
     <hr />

     <p>
       <a className="boxLink" href={'https://github.com/${propriedades.githubUser}'}>
         @{propriedades.githubUser}
       </a>
     </p>  
     <hr />

     <AlurakutProfileSidebarMenuDefault />
   </Box>
 )
}

function ProfileRelationsBox(propriedades) {
 return (
   <ProfileRelationsBoxWrapper>
     <h2 className="smallTitle">
       {propriedades.title} ({propriedades.items.length})
     </h2>
     <ul>
        { 
        propriedades.items.map((pessoa,i)=>{
          
          if (i<6)return(
           <li key={pessoa.id}>
           <a href= {`/users/${pessoa.login}`} >
              <img src={pessoa.avatar_url}/>
              <span>{pessoa.login}</span>
            </a>

           </li>
          )
        })} 

        </ul>
   </ProfileRelationsBoxWrapper>
 )
}

export default function Home() {
 const githubUser = 'vicbarkfeld';
 
 const [comunidades, setComunidades] = React.useState([]);
 
 /* const comunidades = ['Alurakut']; */
 const pessoasFavoritas = ['juunegreiros', 'rafaballerini', 'bullas', 'omariosouto', 'rhubark', 'lucasmontano']

 const [seguidores, setSeguidores] = React.useState([]);
 // 0 - Pegar o array de dados do github  // GET
  React.useEffect(()=>{
    fetch(`https://api.github.com/users/vicbarkfeld/following`)
    .then((res)=>res.ok?res.json():false)
    .then(fullRes=>{
      console.log(fullRes)
      setSeguidores(fullRes);
    })


    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization' : '449f4f191ef30ad190fde5b8b7c794',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query{
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      } ` })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(respostaCompleta)
      setComunidades(comunidadesVindasDoDato)      
    }); 
  
  },[]);

 // 1 - Criar um box que vai ter um map, baseado no itens do array que pegamos do github

 return(
   <>
     <AlurakutMenu />
     <MainGrid>
       <div className="profileArea" style={{ gridArea: 'profileArea' }}>
         <ProfileSidebar githubUser={githubUser}/>
       </div>
       <div style={{ gridArea: 'welcomeArea' }}>
         <Box>
           <h1 className="title">
             Bem vinda, Vic!
           </h1>

           <OrkutNostalgicIconSet fas={99} fotos={134} mensagens={10} recados={9} confiavel={3} legal={3} sexy={3}/>            
         </Box>  

         <Box>
           <h2 className="subTitle">O que você deseja fazer?</h2>
           
           <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));
              
              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: 'usuarioAleatorio'
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })
            }}>
             
             <div>
               <input 
               placeholder="Qual vai ser o nome da sua comunidade?" 
               name="title" 
               aria-label="Qual vai ser o nome da sua comunidade?"
               type="text"
               />
             </div>
             <div>
               <input 
               placeholder="Coloque uma URL para usarmos de capa" 
               name="image" 
               aria-label="Coloque uma URL para usarmos de capa"
               />
             </div>

             <button>
               Criar comunidade
             </button>
           </form>
         </Box>          
       </div>

       <div className="profileRelationsArea" style={{ gridArea: 'profileRelationArea' }}>
         <ProfileRelationsBox title="Seguidores" items={seguidores} />
         <ProfileRelationsBoxWrapper>
           <h2 className="smallTitle">
             Pessoas da comunidade ({pessoasFavoritas.length})
           </h2>

           <ul>
        {pessoasFavoritas.map((githubUser,i)=>{
          
          if (i<6)return(
           <li key={githubUser}>
           <a href= {`/users/${githubUser}`} >
              <img src={`https://github.com/${githubUser}.png`}/>
              <span>{githubUser}</span>
            </a>

           </li>
          )
        })}

        </ul>
         </ProfileRelationsBoxWrapper>          
         <ProfileRelationsBoxWrapper>
           <h2 className="smallTitle">
             Comunidades ({comunidades.length})
           </h2>
           <ul>
        {comunidades.map((comunidade, i)=>{
          if(i<6) return(
           <li key={comunidade.id}>
           <a href= {`/communities/${comunidade.id}`} >
              <img src={comunidade.imageUrl}/>
              <span>{comunidade.title}</span>
            </a>

           </li>
          )
        })}

        </ul>
       </ProfileRelationsBoxWrapper>
       </div>
     </MainGrid>
     </>
 )
}
