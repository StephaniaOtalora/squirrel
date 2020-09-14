const url ="https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";
fetch(url)
    .then(data => {
        return data.json();
    })
    .then(data=>{

        let event = new Array();

        for (let i=0; i<data.length;i++){

            let tableRow = document.createElement("tr");
            let th1 = document.createElement("td");
            let th2 = document.createElement("td");
            let th3 = document.createElement("td");
            let table = document.getElementById("tableEvents");

            let node1 = document.createTextNode(i+1);
            let node2 = document.createTextNode(data[i].events);
            let node3 = document.createTextNode(data[i].squirrel);

            for(let j = 0;j<data[i].events.length;j++){
                if(!event.includes(data[i].events[j])){
                    event.push(data[i].events[j]);
                }
            }

            if(data[i].squirrel==true){
                tableRow.style.backgroundColor="lightblue";
            }

            th1.appendChild(node1);
            th2.appendChild(node2);
            th3.appendChild(node3);

            tableRow.appendChild(th1);
            tableRow.appendChild(th2);
            tableRow.appendChild(th3);

            table.appendChild(tableRow);
        }

        let TP = new Array(event.length);
        for(let i=0;i<event.length;i++){
            TP[i]=0;
        }
        let TN = new Array(event.length);
        for(let i=0;i<event.length;i++){
            TN[i]=0;
        }
        let FP = new Array(event.length);
        for(let i=0;i<event.length;i++){
            FP[i]=0;
        }
        let FN = new Array(event.length);
        for(let i=0;i<event.length;i++){
            FN[i]=0;
        }

        for (let i=0; i<event.length;i++){
            for(let j=0;j<data.length;j++){
                if(data[j].events.includes(event[i])){
                    if(data[j].squirrel==true){
                        TP[i]++;
                    }else{
                        FN[i]++;
                    }
                }else {
                    if(data[j].squirrel==true){
                        FP[i]++;
                    }else{
                        TN[i]++;
                    }
                }
            }
        }

        let corr = new Array(event.length);

        for(let i=0;i<event.length;i++){
            corr[i] = (((TP[i]*TN[i])-(FP[i]*FN[i]))/(Math.sqrt((TP[i]+FP[i])*(TP[i]+FN[i])*(TN[i]+FP[i])*(TN[i]+FN[i]))));
        }

        for(let i =0;i<event.length;i++){
            for(let j = 0;j<event.length;j++){
                if(corr[i] > corr[j]){
                    let temp = corr[i];
                    let temp1 = event[i];

                    corr[i] = corr[j];
                    corr[j] = temp;

                    event[i] = event[j];
                    event[j] = temp1;
                }
            }
        }

        for(let i=0;i<event.length;i++){
            let tableRow = document.createElement("tr");
            let th1 = document.createElement("td");
            let th2 = document.createElement("td");
            let th3 = document.createElement("td");

            let table = document.getElementById("tableCorrelation");

            let node1 = document.createTextNode(i+1);
            let node2 = document.createTextNode(event[i]);
            let node3 = document.createTextNode(corr[i]);

            th1.appendChild(node1);
            th2.appendChild(node2);
            th3.appendChild(node3);

            tableRow.appendChild(th1);
            tableRow.appendChild(th2);
            tableRow.appendChild(th3);

            table.appendChild(tableRow);
        }

        
    })