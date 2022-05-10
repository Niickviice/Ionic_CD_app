import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class Validadores {
    static mismoValor(nombreCampoAComparar): ValidatorFn {
      return (control:AbstractControl) : ValidationErrors | null => {      
        let error = null;
        //control.parent es el formulario
        //si el formulario ya existe 
        if (control && control.parent) {        
          const campo = control.value;
          const campoAComparar = control.parent.get(nombreCampoAComparar).value;
          //si no coinciden
          if(campo!=campoAComparar){
            //regresamos un error, puede parecer redundante esto, 
            // pero angular valida errores por la presencia del objeto y no tanto por su valor booleano
            error = {
              diferente:true
            }
          }        
        }
        return error
      };
    }
    
  }