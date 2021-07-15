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
 
 const [comunidades, setComunidades] = React.useState([{ 
   id: '3165615615546835',   
   title: 'Eu odeio acordar cedo',
   image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
 },
 {
   id: '657452357633',
   title: 'Deus ajuda quem cedo Madruga',
   image: 'https://uploads.metropoles.com/wp-content/uploads/2020/10/03162107/Seu-Madruga-1.jpg',
 },
 {
   id: '65745235763387987987',
   title: 'Se eu morrer, minha mãe me mata',
   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnzKl50yuNKy-LIPGEBmFsGUKluqJ9y02SXsM5bK321w_sieAQgRNm_jjNz_AFiM1g6ss&usqp=CAU',
 },
 {
   id: '4673413763234543213213',
   title: 'LBGTQIA+',
   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ4tVAuTlQVBahX6HdWZWfi28zJLf__DQ3WL3TmjYicvYJafcE5OkgCvfpCK7UPTgpYkU&usqp=CAU',
 },
 {
   id: '79741546',
   title: 'Alura Lovers',
   image: 'https://yt3.ggpht.com/ytc/AKedOLRszi3O39AB5-uw_1jkrxJppwegjToBgIKFIOqiiA=s900-c-k-c0x00ffffff-no-rj'
 },
 {
   id: '6668555588877',
   title: 'A Louca dos gatos',
   image: 'https://pbs.twimg.com/media/DM3C5_jWsAA5wsX?format=jpg&name=small',
 }
]);
 
 /* const comunidades = ['Alurakut']; */
 const pessoasFavoritas = ['juunegreiros', 'rafaballerini', 'bullas', 'omariosouto', 'rhubark', 'lucasmontano']

 const [seguidores, setSeguidores] = React.useState([]);
 // 0 - Pegar o array de dados do github  
  React.useEffect(()=>{
    fetch(`https://api.github.com/users/vicbarkfeld/following`)
    .then((res)=>res.ok?res.json():false)
    .then(fullRes=>{
      console.log(fullRes)
      setSeguidores(fullRes);
    })

  },[])

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
               id: new Date().toISOString(),
               title: dadosDoForm.get('title'),
               image: dadosDoForm.get('image'),
             }

             const comunidadesAtualizadas = [...comunidades, comunidade];
             setComunidades(comunidadesAtualizadas)
           }} >
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
        {pessoasFavoritas.map((pessoa,i)=>{
          
          if (i<6)return(
           <li key={pessoa}>
           <a href= {`/users/${pessoa}`} >
              <img src={`https://github.com/${pessoa}.png`}/>
              <span>{pessoa}</span>
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
           <a href= {`/users/${comunidade.title}`} >
              <img src={comunidade.image}/>
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