import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import './App.css'
import TextError from './components/TextError'

const initialValues = {
  name: '',
  surname: '',
  address: '',
  email: '',
  comments: '',
  social: {
    fb: '',
    instagram: '',
  },
  phoneNumber: ['', ''],
  phNumbers: [''],
}

const savedValues = {
  name: 'Lukasz',
  surname: 'Klekner',
  address: '',
  email: '',
  comments: 'I am learning how to use Formik',
  social: {
    fb: '',
    instagram: '',
  },
  phoneNumber: ['', ''],
  phNumbers: [''],
}

const onSubmit = (values, onSubmitProps) => {
  console.log(values)
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
})

const validationComments = (value) => {
  let error

  if (!value) {
    error = 'Required!'
  }

  return error
}

function App() {
  const [formValues, setFormValues] = useState(null)
  return (
    <div className='App'>
      <Formik
        initialValues={formValues || initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formik) => (
          <Form>
            <div>
              <Field type='text' name='name' placeholder='First Name' />
              <ErrorMessage name='name' component={TextError} />
            </div>
            <div>
              <Field type='text' name='surname' placeholder='Surname' />
              <ErrorMessage name='surname' component='div' />
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
                        <div className='error'>{meta.error}</div>
                      ) : null}
                    </>
                  )
                }}
              </Field>
            </div>
            <div>
              <Field type='text' name='social.fb' placeholder='FB' />
            </div>
            <div>
              <Field
                type='text'
                name='social.instagram'
                placeholder='Instagram'
              />
            </div>
            <div>
              <Field
                type='text'
                name='phoneNumber[0]'
                placeholder='Primary Phone Number'
              />
            </div>
            <div>
              <Field
                type='text'
                name='phoneNumber[1]'
                placeholder='Secondary Phone Number'
              />
            </div>
            <div>
              <label>List of phone numbers</label>
              <FieldArray name='phNumbers'>
                {(FieldArrayProps) => {
                  const { push, remove, form } = FieldArrayProps
                  const {
                    values: { phNumbers },
                  } = form

                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type='button' onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                          <button type='button' onClick={() => push('')}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  )
                }}
              </FieldArray>
            </div>
            <div>
              <Field type='email' name='email' placeholder='Email' />
              <ErrorMessage name='email'>
                {(error) => <div className='error'>{error}</div>}
              </ErrorMessage>
            </div>
            <div>
              <Field
                as='textarea'
                name='comments'
                placeholder='Comments'
                validate={validationComments}
              />
              <ErrorMessage name='comments' component={TextError} />
            </div>
            <button
              type='submit'
              // disabled={!formik.isValid}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Send!
            </button>
            <button
              type='button'
              onClick={() => formik.validateField('comments')}
            >
              Validate comments
            </button>
            <button type='button' onClick={() => formik.validateForm()}>
              Validate all
            </button>
            <button
              type='button'
              onClick={() => formik.setFieldTouched('comments')}
            >
              Visit comments
            </button>
            <button
              type='button'
              onClick={() =>
                formik.setTouched({
                  email: true,
                  name: true,
                  surname: true,
                })
              }
            >
              Visit all
            </button>
            <button type='button' onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default App
