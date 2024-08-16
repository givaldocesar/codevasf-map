# codevasf-map
Componentes React + OpenLayers para desenvolvimento de projetos WEB da CODEVASF.

## Recursos
    -- react com typescript 
    -- sass 
    -- classNames 
    -- openLayers

## Componentes
    ╚> Map: Cria o objeto Map do OL.

    ╚> Controls:       Agrupa os controles do mapa. (Ajuda a organizar o código)
        --Title:        Adiciona um título ao mapa.
        --Legend:       Adiciona legenda ao mapa, onde é possivel alterar o estado das camadas.
        --Scale:        Mostra uma escala gráfica no mapa.
        --Attributions: Permite visualizar as informações de atribuições na 'source' das camadas.

        É possivel controlar a posição dos controles através do atributo 'className' com CSS ou tailwind.
    
    ╚> TileLayers:             Agrupa as camadas de base. (Ajuda a organizar o código)
        -- OpenStreetLayer:     Adiciona uma camada OSM ao mapa.
            --> standard:   <boolean>   Define que a camada será exibida inicialmente.
            --> order:      <number>    Define a ordem da camada na legenda.
            --> zIndex:     <number>    Define a ordem de exibição da camada. 
                                        Camadas com valores mais baixos são sobrepostas.

        -- GoogleLayer:     Adiciona uma camada do Google ao mapa.
                            Necessário API do Google para funcionar, o valor da API deve estar guardada na variável NEXT_PUBLIC_API_KEY ou API_KEY.
            
            --> standard:   <boolean>   Define que a camada será exibida inicialmente.
            --> order:      <number>    Define a ordem da camada na legenda.
            --> zIndex:     <number>    Define a ordem de exibição da camada. 
                                        Camadas com valores mais baixos são sobrepostas.
    
    ╚> VectorLayers:   Agrupa as camadas vetoriais. (Ajuda a organizar o código)
        -- Layer:       Adiciona uma camada vetorial ao mapa.
            -->attributions: <string | string[]> Adiciona fontes a camada, são exibidas com o control "Attributions".
            -->data:         <object>            Dados a serem exibidos no mapa, no formato GeoJSON. 
            -->title:        <string>            Adiciona um titulo a camada, visivel na legenda.

            ╚> style:
                Style:  Disponibiliza o estilo da camada para os elementos-filhos.
                Stroke: Altera a linha da camada.
                        -->color:   Altera a cor da linha.
                        -->width:   Altera a espessura da linha.
                Fill:   Altera o preenchimento da camada.
                        -->color:   Altera a cor do preenchimento.

                