import { useFormik } from 'formik'
import './App.css'

const initialValues = {
  name: '',
  surname: '',
  email: '',
}

const onSubmit = (values) => {
  console.log(values)
}

const validate = (values) => {
  let errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.surname) {
    errors.surname = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  }

  return errors
}

function App() {
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validate,
    })
  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='name'
            placeholder='First Name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? (
            <div className='error'>{errors.name}</div>
          ) : null}
        </div>
        <div>
          <input
            type='text'
            name='surname'
            placeholder='Surname'
            value={values.surname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.surname && errors.surname ? (
            <div className='error'>{errors.surname}</div>
          ) : null}
        </div>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <div className='error'>{errors.email}</div>
          ) : null}
        </div>
        <button type='submit'>Send!</button>
      </form>
    </div>
  )
}

export default App
