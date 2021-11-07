import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import jspdf from '@salesforce/resourceUrl/jspdf';
import autotable from '@salesforce/resourceUrl/autotable';
export default class GeneratePDF extends LightningElement {
    data = [{"ID":"1", "Name": "Donna", "Email": "dmoore0@furl.net","Country": "China","IP-address":"211.56.242.221"},
        {"ID":"2", "Name": "Janice", "Email":"jhenry1@theatlantic.com", "Country":"Ukraine", "IP-address": "38.36.7.199"}];

    headers = this.createHeaders(['ID', 'Name', 'Email', 'Country', 'IP-address']);

    renderedCallback() {
        if(this.jspdfLoaded)
            return;
        this.jspdfLoaded = true;
        Promise.all([loadScript(this,jspdf), loadScript(this,autotable)])
        .then(console.log("autotable "+ autotable + " jspdf " + jspdf))
           
    }
    
    generate() {
        console.log("generate")
        const {jsPDF} = window.jspdf;
        const doc = new jsPDF({
            encryption:{
                userPassword: "user",
                ownerPassword: "owner",
                userPermission: ["print", "modify", "copy", "annot-forms"]
            },
            format: "a4"
        });
        //var finalY = doc.lastAutoTable.finalY || 10
        doc.text('From javascript arrays', 14, 20)
        
        doc.table(30,30, this.data, this.headers, {autosize:true})
        // doc.autoTable({ html: '#table' })
        // doc.autoTable({
        //     startY: 20,
        //     head: [['ID', 'Name', 'Email', 'Country', 'IP-address']],
            // body: [
            //     ['1', 'Donna', 'dmoore0@furl.net', 'China', '211.56.242.221'],
            //     ['2', 'Janice', 'jhenry1@theatlantic.com', 'Ukraine', '38.36.7.199'],
            //     [
            //         '3',
            //         'Ruth',
            //         'rwells2@constantcontact.com',
            //         'Trinidad and Tobago',
            //         '19.162.133.184',
            //     ],
            //     ['4', 'Jason', 'jray3@psu.edu', 'Brazil', '10.68.11.42'],
            //     ['5', 'Jane', 'jstephens4@go.com', 'United States', '47.32.129.71'],
            //     ['6', 'Adam', 'anichols5@com.com', 'Canada', '18.186.38.37'],
            // ],
        // })
        console.log("implemented jspdf")

        // finalY = doc.lastAutoTable.finalY
        doc.text('A keyboard or mouse sends an event only if a key or button is pressed or the mouse is moved. They do not start to send events as your hand approaches the device. On the other hand, 3D input devices, like the Leap Motion controller, start to send frames as soon as they are turned on. ',
            10, 90, { "maxWidth": 150 })

        doc.save('table.pdf')
    }

    createHeaders(keys) {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
            result.push({
                id: keys[i],
                name: keys[i],
                prompt: keys[i],
                width: 30,
                align: "center",
                padding: 0
            });
        }
        return result;
    }
}