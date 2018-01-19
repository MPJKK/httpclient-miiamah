import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-http-test',
    templateUrl: './http-test.component.html',
    styleUrls: ['./http-test.component.scss']
})
export class HttpTestComponent implements OnInit {

    tulos: string = 'Moi';
    apitulos = 'Moi taas';
    pistetulos = '';
    apiosoite = 'http://media.mw.metropolia.fi/wbma';
    kuvaosoite = 'http://media.mw.metropolia.fi/wbma/uploads/';
    pisteosoite = 'https://api.openchargemap.io/v2/';


    constructor(private http: HttpClient) {
    }

    getJson() {
        interface Myinterface {
            license: string;
        }

        this.http.get<Myinterface>('assets/package.json').subscribe(data => {
            console.log(data);
            this.tulos = data.license;
        });
    }

    getFromApi() {
        this.http.get(this.apiosoite + '/media').subscribe(data => {
            console.log(data[0].filename);
            this.apitulos = this.kuvaosoite + data[0].filename;
        });
    }

    getFromPiste() {
        this.http.get(this.pisteosoite + '/poi/?output=json&countrycode=FIN&maxresults=2').subscribe(data => {
            console.log(data[0]);
            this.pistetulos = data[0].ID;
        });
    }

    ngOnInit() {
        this.getJson();
        this.getFromApi();
        this.getFromPiste();
    }

}
