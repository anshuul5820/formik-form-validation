import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const invalidStringMessage = () => 'String must be greater than 5 & less than 20 chars'

const App = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('email is required'),
      password: Yup.string().min(5, invalidStringMessage).max(20, invalidStringMessage).trim().required('password is required'),
    }),
    onSubmit: (values) => alert(JSON.stringify(values, null, 5)),
  })

  return (
    <div className='form-container'>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email here:</label>
          <input
            type='email'
            id='email'
            className='form-control'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password here:</label>
          <input
            type='password'
            id='password'
            className='form-control'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
