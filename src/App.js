import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './App.css'

const initialValues = {
  name: '',
  surname: '',
  address: '',
  email: '',
  comments: '',
}

const onSubmit = (values) => {
  console.log(values)
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
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
            <Field name='address'>
              {(props) => {
                const { field, meta } = props
                return (
                  <>
                    <input
                      type='text'
                      id='address'
                      placeholder='Address'
                      {...field}
                    />
                    {meta.touched && meta.error ? (
                      <div>{meta.error}</div>
                    ) : null}
                  </>
                )
              }}
            </Field>
          </div>
          <div>
            <Field type='email' name='email' placeholder='Email' />
            <ErrorMessage name='email' />
          </div>
          <div>
            <Field as='textarea' name='comments' placeholder='Comments' />
          </div>
          <button type='submit'>Send!</button>
        </Form>
      </Formik>
    </div>
  )
}

export default App
