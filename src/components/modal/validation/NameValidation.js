export function validate (formProps) {
  let errors = {}
  if (!formProps.name) {
    errors.name = 'Please enter the name'
  }
  return errors
}
