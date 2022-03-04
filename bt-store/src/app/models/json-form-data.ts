export interface jsonFormControls {
    name: string
    label: string
    value: string
    type: string
    formText: string
    validators: JsonFormValidators
  }
  
  interface JsonFormValidators {
    required?: boolean
    minLength?: number
  }
  
  export interface JsonFormData {
    controls: jsonFormControls[];
  }
