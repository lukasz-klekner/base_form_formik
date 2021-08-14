import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './App.css'

const initialValues = {
  name: '',
  surname: '',
  email: '',
}

const onSubmit = (values) => {
  console.log(values)
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
})

function App() {
  return (
    <div className='App'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div>
            <Field type='text' name='name' placeholder='First Name' />
            <ErrorMessage name='name' />
          </div>
          <div>
            <Field type='text' name='surname' placeholder='Surname' />
            <ErrorMessage name='surname' />
          </div>
          <div>
            <Field type='email' name='email' placeholder='Email' />
            <ErrorMessage name='email' />
          </div>
          <button type='submit'>Send!</button>
        </Form>
      </Formik>
    </div>
  )
}

export default App
