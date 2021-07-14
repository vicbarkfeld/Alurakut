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
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
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
    title: 'Eu tive um Orkut',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsXc97pR_eheweKDN48ZzKYWA8xwHzy7H79bZWuCQpd0-diFItQrZV6r2D72Umsc4sZMsQx-brPDYH1w&usqp=CAU',
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
  const pessoasFavoritas = [
    'juunegreiros', 
    'rafaballerini',
    'bullas',
    'omariosouto', 
    'rhubark',     
    'lucasmontano',    
  ]
  const [seguidores, setSeguidores] = React.useState([]);
  // 0 - Pegar o array de dados do github  
  React.useEffect(function() {
    fetch('https://api.github.com/users/vicbarkfeld/followers')
    .then(function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
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

            <OrkutNostalgicIconSet />            
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
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
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
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
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
