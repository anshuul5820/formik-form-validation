import React, { useState } from 'react'
import { ErrorMessage, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { string } from 'yup/lib/locale'

const invalidStringMessage = () => 'String must be greater than 5 & less than 20 chars'

const App = () => {
  const [errors, setErrors] = useState('')
  const handleFormSubmit = async (formData: any) => {
    const response = await axios.post('http://localhost:4000/signup', {
      email: formData.email,
      password: formData.password,
    })
    setErrors(response.statusText)
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('email is required'),
        password: Yup.string().min(5, invalidStringMessage).max(20, invalidStringMessage).trim().required('password is required'),
      })}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      {(formik) => (
        <div className='form-container'>
          <form onSubmit={formik.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email here:</label>
              <input type='email' id='email' className='form-control' {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password here:</label>
              <input type='password' id='password' className='form-control' {...formik.getFieldProps('password')} />
              {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
            </div>

            {!!errors.length && <p>{errors}</p>}
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      )}
    </Formik>
  )
}

export default App
