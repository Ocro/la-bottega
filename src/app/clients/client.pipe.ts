import { Pipe, PipeTransform } from '@angular/core';
import { Injectable }    from '@angular/core';

@Pipe({ 
  name: 'client'
})
@Injectable()
export class ClientPipe implements PipeTransform {

  transform(clients: any, searchText: any): any {

    if (searchText == null || clients == null) return clients;
    let terms = searchText.split(" ").filter(term => term.length > 0);

    return clients.filter(function(client) {
      for (var term of terms) {
        if (!(client.name && client.name.toLowerCase().indexOf(term.toLowerCase()) == 0 ||
              client.firstname && client.firstname.toLowerCase().indexOf(term.toLowerCase()) == 0 ||
              client.address && client.address.toLowerCase().indexOf(term.toLowerCase()) == 0 ||
              client.npa && client.npa.toLowerCase().indexOf(term.toLowerCase()) == 0 ||
              client.city && client.city.toLowerCase().indexOf(term.toLowerCase()) == 0))
          return false;
      }

      return true;
    })
  }
}