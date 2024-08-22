# codevasf-map
Componentes React + OpenLayers para desenvolvimento de projetos WEB da CODEVASF.

## Recursos
    -- react com typescript 
    -- sass 
    -- classNames 
    -- openLayers

## Componentes
    ╚> Map: Cria o objeto Map do OL.
        -->center:      [<number>,<number>]     Ponto central inicial do mapa.
        -->zoom:        <number>                Zoom inicial do mapa.
        -->minZoom:     <number>                Zoom mínimo permitido pelo mapa.
        -->maxZoom      <number>                Zoom máximo permitido pelo mapa.
        -->projection:  <"EPSG:31983" |         Sistema de Projeção utilizado no mapa.
                         "EPSG:31984" | 
                         "EPSG:4674" | 
                         "EPSG:4326">

    ╚> Controls:        Agrupa os controles do mapa. (Ajuda a organizar o código)
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
            -->layer:           <CustomLayer>           Layer que servirá de base para a camada.
                                                        Caso omitida, será adicionada a padrão.
            -->fit:             <boolean>               Enquadra a camada no mapa após seu carregamento.
            -->attributions:    <string | string[]>     Adiciona fontes a camada, são exibidas com o control "Attributions".
            -->data:            <object>                Dados a serem exibidos no mapa, no formato GeoJSON. 
            -->title:           <string>                Adiciona um titulo a camada, visivel na legenda.
            -->minZoom:         <number>                Zoom mínimo que a camada será exibida.
            -->maxZoom          <number>                Zoom máximo que a camada será exibida.
            -->zIndex           <number>                Define a ordem de exibição da camada. 
                                                        Camadas com valores mais baixos são sobrepostas.
            -->geometry:        <'Point' |              Geometria das feições da camada.
                                 'LineString' |         Não altera a exibição, apenas utilizada pra definir o ícone que aparecerá na legenda.
                                 'Polygon' | 
                                 undefined>

            ╚> style:
                --Style:                        Disponibiliza o estilo da camada para os elementos-filhos.
                    -->visible:     <boolean>   Define se a camada será exibidade por padrão.
                --CategorizedStyle: Cria um estilo categorizado para a camada. Necessário adicionar elementos "Category" para estilizar.
                    -->field:       <string>            Campo que irá categorizar a camada. 
                                                        P.ex: Categorizar Municípios pelo "field" nome.
                --Category:                             Cria uma categoria para um estilo categorizado.
                    --->label:      <string>            Rotulo da categoria que aparecerá na legenda.
                                                        Caso não seja fornecido, o valor usado será o 'value'.
                    --->geometry:   <'Point' |          Tipo de ícone que aparecerá na legenda.
                                     'LineString' |     Caso não seja fornecido será usado a geometria da camada.
                                     'Polygon' | 
                                     undefined>                                              
                    --->value:                          Valor de filtro das feições.
                                                        O filtro utiliza a propriedade "field" de "CategorizedStyle".
                    --->value = 'NO_CATEGORY'           Exibe e estiliza as feições que não foram categorizadas.
                --Stroke:           Altera a linha da camada ou categoria.
                    -->color:                   Altera a cor da linha.
                    -->width:                   Altera a espessura da linha.
                --Fill:             Altera o preenchimento da camada ou categoria.
                    -->color:                   Altera a cor do preenchimento.
        
        -- URLDataLayer:            Extensão de "Layer". Usa dados adquiridos de uma URL:
            --> url:        <string>        URL para aquisição dos dados.
                                            Deve conter o cabeçário 'Content-Type' com os valores:
                                                >application/json:                      para dados GeoJSON.
                                                >application/vnd.google-earth.kml+xml:  para dados KML;      
            --> urlInit:    <RequestInit>   Opções para a função 'fetch'.

                