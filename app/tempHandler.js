export let temp1 = `<div>
        <h1>Dashboard Demo</h1>
        <button class="toggle-btn" onclick="toggleTemplate()">Toggle easy Template</button>
    </div> 
    <div class="dashboard-container">
        <!-- Neue Rechtsvorhaben -->
        <div class="widget" data-ode-flex-dash="ture" id="widget_1" data-widget-position="1">
            <div class="widget-span-handle"></div>
            <div class="widget-handle"></div>
            <div class="widget-span-handle"></div>
            <div class="widget-item" id="widget-item-1">
                <div class="widget-header">
                    <p class="title">Neue Rechtsvorhaben</p>
                    <button class="primary-sm-btn" onclick="addRechtsvorhabenRow(event)">+</button>
                </div>

                <div id="widget-item-rech">
                    <div class="data-row-1" onclick="removeItem(event)">
                        <div class="cod-conta"> <span class="cod">EU</span> <span class="cod cod-1">Richline</span> <span class="cod cod-2">Nachhaltigkeit</span> </div>
                        <p class="sub-title">Rechtsvorhaben 1</p>
                    </div>
                    
                    <div class="data-row-1" onclick="removeItem(event)">
                        <div class="cod-conta"> <span class="cod">EU</span> <span class="cod cod-1">Richline</span> <span class="cod cod-2">Nachhaltigkeit</span> </div>
                        <p class="sub-title">Rechtsvorhaben 2</p>
                    </div>
    
                    <div class="data-row-1" onclick="removeItem(event)">
                        <div class="cod-conta"> <span class="cod">EU</span> <span class="cod cod-1">Richline</span> <span class="cod cod-2">Nachhaltigkeit</span> </div>
                        <p class="sub-title">Rechtsvorhaben 3</p>
                    </div>
    
                    <div class="data-row-1" onclick="removeItem(event)">
                        <div class="cod-conta"> <span class="cod">EU</span> <span class="cod cod-1">Richline</span> <span class="cod cod-2">Nachhaltigkeit</span> </div>
                        <p class="sub-title">Rechtsvorhaben 4</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Aktueller Stand der Rechtsvorhaben -->
        <div class="widget" data-ode-flex-dash="ture" id="widget_2" data-widget-position="2">
            <div class="widget-handle"></div>
            <div class="widget-span-handle"></div>
            <div class="widget-item" id="widget-item-2">
                <div class="widget-header">
                    <p class="title">Aktueller Stand der Rechtsvorhaben</p>
                    <button class="primary-sm-btn" onclick="addStandRow()">+</button>
                </div>

                <div id="widget-item-stand">
                    <div class="data-row-1" onclick="removeItem(event)">
                        <div class="chksbxs-conta">
                            <span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span>
                        </div>
                        <p class="sub-title">Rechtsvorhaben 1</p>
                    </div>
    
                    <div class="data-row-1" onclick="removeItem(event)">
                        <div class="chksbxs-conta">
                            <span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span>
                        </div>
                        <p class="sub-title">Rechtsvorhaben 2</p>
                    </div>
    
                    <div class="data-row-1" onclick="removeItem(event)">
                        <div class="chksbxs-conta">
                            <span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span>
                        </div>
                        <p class="sub-title">Rechtsvorhaben 3</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Zhalen und Fakten -->
        <div class="widget" data-ode-flex-dash="ture" id="widget_3" data-widget-position="3">
            <div class="widget-span-handle"></div>
            <div class="widget-handle"></div>
            <div class="widget-item" id="widget-item-3">
                <div class="widget-header">
                    <p class="title">Zhalen und Fakten</p>
                </div>
                <div class="data-row-1 datadiv-cota">
                    <div class="data-div"> <p class="sub-title">Documente</p> <p class="fapnum">5.789</p> </div>
                    <div class="data-div"> <p class="sub-title">Favoriten</p> <p class="fapnum">756</p> </div>
                    <div class="data-div"> <p class="sub-title">Anlagen</p> <p class="fapnum">6567</p> </div>
                </div>
            </div>
        </div>

        <!-- Abonnements -->
        <div class="widget" data-ode-flex-dash="ture" id="widget_4" data-widget-position="4">
            <div class="widget-handle"></div>
            <div class="widget-span-handle"></div>
            <div class="widget-item" id="widget-item-4">
                <div class="widget-header">
                    <p class="title">Abonnements</p>
                </div>

                <div class="data-row-1">
                    <ul class="data-list" id="widget-item-apo">
                        <li onclick="removeItem(event)"><p>Verteiler 1</p> <span>...</span></li>
                        <li onclick="removeItem(event)"><p>Verteiler 2</p> <span>...</span></li>
                        <li onclick="removeItem(event)"><p>Verteiler 3</p> <span>...</span></li>
                        <li onclick="removeItem(event)"><p>Verteiler 4</p> <span>...</span></li>
                        <li onclick="removeItem(event)"><p>Verteiler 5</p> <span>...</span></li>
                        <li onclick="removeItem(event)"><p>Verteiler 6</p> <span>...</span></li>
                    </ul>
                </div>

                <div class="btn-conta">
                    <button class="primary-btn" onclick="addAbonnRow()">Verteiler Anpassen</button>
                </div>
            </div>
        </div>

        <!-- Termine und Veranstaltungen -->
        <div class="widget" data-ode-flex-dash="ture" id="widget_5" data-widget-position="5">
            <div class="widget-span-handle"></div>
            <div class="widget-handle"></div>
            <div class="widget-item" id="widget-item-5">
                <div class="widget-header">
                    <p class="title">Termine und Veranstaltungen</p>
                </div>

                <div class="data-row-1 calender-conta"> <!-- js --> </div>

                <div class="btn-conta">
                    <button class="primary-btn" onclick="">Alle Termine anzeigen</button>
                </div>
            </div>
        </div>

        <!-- Aktuelle Documente -->
        <div class="widget" data-ode-flex-dash="ture" id="widget_6" data-widget-position="6">
            <div class="widget-handle"></div>
            <div class="widget-span-handle"></div>
            <div class="widget-item" id="widget-item-6">
                <div class="widget-header">
                    <p class="title">Aktuelle Documente</p>
                </div>

                <div class="data-row-1">
                    <div class="tabrow"> <span>Datum</span> <span>Thema</span> <span>Title</span> <span>Beschreibung</span> </div>

                    <div class="tabrow"> <span>20.08</span> <span>Info-Brief</span> <span>Some Title</span> <span>Some Descreption </span> </div>
                    <div class="tabrow"> <span>21.08</span> <span>Info-Brief</span> <span>Some Title</span> <span>Some Descreption </span> </div>
                    <div class="tabrow"> <span>22.08</span> <span>Info-Brief</span> <span>Some Title</span> <span>Some Descreption </span> </div>
                    <div class="tabrow"> <span>23.08</span> <span>Info-Brief</span> <span>Some Title</span> <span>Some Descreption </span> </div>
                </div>
            </div>
        </div>

</div>`

export let temp2 = `
<div>
    <h1>Dashboard Demo</h1>
    <button class="toggle-btn" onclick="toggleTemplate()">Toggle easy Template</button>
</div> 
    <div class="dashboard-container">
        <div class="empty-widget widget" data-ode-flex-dash="true" id="widget_1" data-widget-position="1"> 1 <div class="widget-handle"></div><div class="widget-span-handle"></div> </div>
        <div class="empty-widget widget" data-ode-flex-dash="true" id="widget_2" data-widget-position="2"> 2 <div class="widget-handle"></div><div class="widget-span-handle"></div> </div>
        <div class="empty-widget widget" data-ode-flex-dash="true" id="widget_3" data-widget-position="3"> 3 <div class="widget-handle"></div><div class="widget-span-handle"></div> </div>
        <div class="empty-widget widget" data-ode-flex-dash="true" id="widget_4" data-widget-position="4"> 4 <div class="widget-handle"></div><div class="widget-span-handle"></div> </div>
        <div class="empty-widget widget" data-ode-flex-dash="true" id="widget_5" data-widget-position="5"> 5 <div class="widget-handle"></div><div class="widget-span-handle"></div> </div>
        <div class="empty-widget widget" data-ode-flex-dash="true" id="widget_6" data-widget-position="6"> 6 <div class="widget-handle"></div><div class="widget-span-handle"></div> </div>
</div>`;


