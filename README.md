# codevasf-map
Componentes React + OpenLayers para desenvolvimento de projetos WEB da CODEVASF.

## Recursos
    -- react com typescript 
    -- sass 
    -- classNames 
    -- openLayers

## Componentes
    ╚> Map: Cria o objeto Map do OL.
        -->name:        <sting>                 Seta um nome para o mapa. Necessário pra usar alguns eventos.
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
        --Scale:        Mostra uma escala gráfica no mapa.
        --Attributions: Permite visualizar as informações de atribuições na 'source' das camadas.
        --Legend:                                                   Adiciona legenda ao mapa, onde é possivel alterar o estado das camadas.
            -->collapsable              <boolean>                   Habilita o botão de colapsar.
            -->collapseImage            <string>                    Caminho para a image de fundo do botão de colapsar. 
            -->collapsePositionButton   <'top_right' | 'top_left'>  Posição do botão para colapsar.
        --DragAndDrop:                                              Adiciona a interação de DragAndDrop arquivos KML's ao mapa.
            -->collapsable              <boolean>                   Habilita o botão de colapsar.
            -->collapseImage            <string>                    Caminho para a image de fundo do botão de colapsar. 
            -->collapsePositionButton   <'top_right' | 'top_left'>  Posição do botão para colapsar.
            -->showControl              <boolean>                   Exibe/Oculta o controle.
            -->showFeaturesProperties   <boolean>                   Habilita um popup que mostra as propriedades da feição, quando o mouse repousa sobre esta.
        --Toolbar:                                                  Adiciona uma toolbar ao mapa. 'Tools' podem ser filhos deste componente.
        --Tool:                                                     Adiciona uma ferramenta a 'Toolbar'. 'Tools' são "buttons" e aceitam suas propriedads HTML.
            -->active:  <boolean>                                   Indica que a ferramenta está ativa.

        É possivel controlar a posição dos controles através do atributo 'className' com CSS ou tailwind.

    ╚> Events:                              Agrupa os eventos externos que interagem com o mapa.
        --AddFeatures:                      Adiciona um 'listener' ao mapa, que ao ouvir um evento do tipo 'AddFeatureEvent' adiciona as feições fornecidas.
        --AddFeaturesEvent:                 Evento que quando disparado adiciona feições ao mapa, caso este possua o evento 'AddFeatures'.    
            -->features:    <Feature[]>     Feições a serem adicionadas. 
            -->layerTitle?: <string>        Titulo da camada que será criada.
             -->zoomTo?:    <boolean>       Ao adicionar, dá zoom nas feições adicionadas.
        
        --FitToFeatures:                    Adiciona um 'listener' ao mapa, que ao ouvir um evento do tipo 'FitToFeatureEvent' executa zoom nas feições fornecidas.
        --FitToFeaturesEvent:               Evento que quando disparado faz com que o mapa centre nas feições fornecidas, caso este possua o evento
                                            'FitToFeatures'.
            -->features:    <Feature[]>     Feições a serem exibidas.  
        --RemoveFeatures:                   Adiciona um 'listener' ao mapa, que ao ouvir um evento do tipo 'RemoveFeaturesEvent' remove as feições fornecidas da
                                            camada fornecida.
        --RemoveFeaturesEvent:              Evento que quando disparado remove as feições fornecidas da camada presente no mapa, caso este possua o evento
                                            'Removefeature'.
            -->layerTitle:  <string>        Título da camada para remover feições.
            -->features:    <Feature[]>     Feições a serem removidas.
        --RemoveLayer:                      Adiciona um 'listener' ao mapa, que ao ouvir um evento do tipo 'RemoveLayerEvent' remove todas as camada com o 
                                            titulo fornecido.
        --RemoveLayerEvent:                 Evento que quando disparado remove todas as camadas com o título fornecido, necessário que o mapa tenha o evento
                                            'RemoveLayer'.
            -->layerTitle:  <string>        Título das camadas que serão removidas.
    
    ╚> TileLayers:             Agrupa as camadas de base. (Ajuda a organizar o código)
        -- OpenStreetLayer:     Adiciona uma camada OSM ao mapa.
            --> standard:   <boolean>   Define que a camada será exibida inicialmente.
            --> order:      <number>    Define a ordem da camada na legenda.
            --> zIndex:     <number>    Define a ordem de exibição da camada. 
                                        Camadas com valores mais baixos são sobrepostas.

        -- GoogleLayer:     Adiciona uma camada do Google ao mapa.
                            Necessário API do Google para funcionar, o valor da API deve estar guardada na variável NEXT_PUBLIC_API_KEY ou API_KEY.
            --> mapType?:   <'hybrid' | 'roadmap' | 'satellite' | 'terrain'>
            --> standard:   <boolean>   Define que a camada será exibida inicialmente.
            --> order:      <number>    Define a ordem da camada na legenda.
            --> zIndex:     <number>    Define a ordem de exibição da camada. 
                                        Camadas com valores mais baixos são sobrepostas.
    
    ╚> VectorLayers:    Agrupa as camadas vetoriais. (Ajuda a organizar o código)
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
            ╚> AttributesTable:                         Exibe um popup com informações sobre as feições. É possível dar zoom em feições específicas, através de
                                                        filtros e botões.
                -->layer:       <CustomLayer>           Camada do map que terá as informações exibidas.
                -->header:      <boolean>               Exibe ou não o cabeçãrio da tabela.
                -->fields:      <FieldType[]>           Lista de campos que serão exibidos como colunas. Há várias opções de customização.

            ╚> style:
                --Style:                        Disponibiliza o estilo da camada para os elementos-filhos.
                    -->visible:     <boolean>   Define se a camada será exibidade por padrão.
                    --Stroke:                       Altera a linha da camada. 
                                                    Utilizar as propriedades de ['FlatStroke do OL'](https://openlayers.org/en/latest/apidoc/module-ol_style_flat.html#~FlatStroke).
                    --Fill:                         Altera o preenchimento da camada.
                                                    Utilizar as propriedades de ['FlatFill do OL'](https://openlayers.org/en/latest/apidoc/module-ol_style_flat.html#~FlatFill).
                    --FeatureLabel:                 Adiciona rótulos as feições de um estilo. 
                        -->expression:  <string>        Template para criar os rótulos. Para utilizar valores presentes nas feições utilize o template 
                                                        '{propriedade}'. P.ex: a expressão '{municipio}' exibirá 'valor_propriedade_municipio', para as feições que possuirem a prorpriedade 'municipio'.
                        OBS: Utilizar as propriedades de ['FlatText do OL'](https://openlayers.org/en/latest/apidoc/module-ol_style_flat.html#~FlatText).
                            É possível adicionar uma padrão pra todas as categorias, colocando o elemento 'FeatureLabel' como filho de 'CategorizedStyle'.

                --CategorizedStyle:                         Cria um estilo categorizado para a camada. Necessário adicionar elementos "Category" para estilizar.
                    -->collapsed:   <boolean>               Define se o item na legenda começara ou não colapsado.
                    -->visible:     <boolean>               Define se a camada será exibidade por padrão.
                    -->field:       <string>                Campo que irá categorizar a camada. 
                                                             P.ex: Categorizar Municípios pelo "field" nome.
                    
                    --Category:                             Cria uma categoria para um estilo categorizado.
                        --->label:      <string>            Rotulo da categoria que aparecerá na legenda.
                                                            Caso não seja fornecido, o valor usado será o 'value'.
                        --->geometry:   <'Point' |          Tipo de ícone que aparecerá na legenda.
                                        'LineString' |      Caso não seja fornecido será usado a geometria da camada.
                                        'Polygon' | 
                                        undefined>                                              
                        --->value:                          Valor de filtro das feições.
                                                            O filtro utiliza a propriedade "field" de "CategorizedStyle".
                        --->value = 'NO_CATEGORY'           Exibe e estiliza as feições que não foram categorizadas.

                        OBS: 'Stroke', 'Fill' e 'FeatureLabel' também podem ser utilizados como filhossde 'Category'.
            
            ╚> interactions:        
                --Interactions:                         Agrupa as interações das camadas vetoriais. (Ajuda a organizar o código).  
                    --Hover:                            Seleciona a feição a qual o mouse está parado.
                    --Click:                            Seleciona uma feição ao clicar nela.
                        --->zoomToFeature:  <boolean>   Dá zoom na feição selecionada. 
                    --SelectedInfoControl:                                      Exibe um controle com conteúdo gerado pela 'factory'.
                        -->collapsable              <boolean>                   Habilita o botão de colapsar.
                        -->collapseImage            <string>                    Caminho para a image de fundo do botão de colapsar. 
                        -->collapsePositionButton   <'top_right' | 'top_left'>  Posição do botão para colapsar.
                        -->factory:                 (<Feature>) => ReactNode    Função que recebe uma feição e retorna o contéudo do 'control'.
                    --SelectControl:                    Adiciona uma barra com um "select" para a interação pai deste elemento.
                        --->fieldValue:     <string>    Campo da feição o qual as opçoes do "select" serão prenchidas, as opções terão todos
                                                        valores distintos deste campo.     
                        --->expression:     <string?>   Template para criar os textos das opções. Para utilizar valores presentes nas feições utilize o template 
                                                        '{propriedade}'. P.ex: a expressão '{municipio}' exibirá 'valor_propriedade_municipio', para as feições que possuirem a prorpriedade 'municipio'.
                        --->label:          <string?>   Rótulo que aparecerá antes do 'select' neste 'control'.
                        --->labelClassName: <string>    Classname CSS para a label.    
                        --->collapsable:    <boolean>   Adicona um botão para colapsar o 'control'. 

                    OBS: 'SimpleStyle' e 'CategorizedStyle' também podem ser utilizados como filhos de 'Hover' e 'Click'.

            ╚> events:        
                --LayerProgressEvent:                       Evento para ouvir o progresso de carregamento de uma camada.
                    -->layerTitle:          <string>        Título da camada que emitiu o evento.
                    -->progress             <number>        Progresso do carregamento. 
                --LayerStatusEvent:                         Evento para ouvir o status de carregamento de uma camada.
                    -->layerTitle:          <string>        Título da camada que emitiu o evento.
                    -->status               "loading" |     Status da camada. 
                                            "complete |
                                            "error"                  
        
        -- URLDataLayer:            Extensão de "Layer". Usa dados adquiridos de uma URL:
            --> url:        <string>        URL para aquisição dos dados.
                                            Deve conter o cabeçário 'Content-Type' com os valores:
                                                >application/json:                      para dados GeoJSON.
                                                >application/vnd.google-earth.kml+xml:  para dados KML;      
            --> urlInit:    <RequestInit>   Opções para a função 'fetch'.
        
        -- APIDataLayer:            Extensão de "Layer". Usa dados adquiridos de uma URL:
            --> database:       <string>        Tabela do banco de dados presente na API da CODEVASF.
            --> urlInit:        <RequestInit>   Opções para a função 'fetch'.
            --> groupField:     <string>        Campo para adquirir as versões dos dados do banco de dados.
                                                P.ex: A área de atuação está presente no banco de dados na tabela 'municipios',
                                                suas versões são consideradas utilizando o coluna "code".
                                                Consulte a API para obter mais informações.

                