import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  IconButton
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import Google from '@seeker/assets/images/social-google.svg';

// ==============================|| AUTH REGISTER ||============================== //

const AuthRegister = ({ ...rest }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      {/* Google Register */}
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Button
            fullWidth
            sx={{
              fontSize: { md: '1rem', xs: '0.875rem' },
              fontWeight: 500,
              backgroundColor: theme.palette.grey[50],
              color: theme.palette.grey[600],
              textTransform: 'capitalize'
            }}
            size="large"
            variant="contained"
          >
            <img src={Google} alt="google" width="20px" style={{ marginRight: 16 }} />
            Register with Google
          </Button>
        </Grid>
      </Grid>

      <Box display="flex" alignItems="center" mt={2}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography sx={{ mx: 2 }}>OR</Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

      <Formik
        initialValues={{
          name: '',
          email: '',
          mobile: '',
          password: '',
          experience: 0,
          skills: [''],
          submit: null
        }}
        validationSchema={Yup.object({
          name: Yup.string().min(3).required('Name is required'),
          email: Yup.string().email().required('Email is required'),
          mobile: Yup.string()
            .matches(/^\d{10}$/, 'Invalid mobile')
            .required('Mobile is required'),
          password: Yup.string().min(6).required('Password is required'),
          experience: Yup.number().min(0).required(),
          skills: Yup.array()
            .of(Yup.string().required('Skill is required'))
            .min(1, 'At least one skill is required')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          setSubmitting(true);
            const { submit, ...payload } = values;

          axios
            .post('http://api.insunil.ind.in/auth/register',payload)
            .then(() => navigate('/seekerlogin'))
            .catch((err) =>
              setErrors({ submit: err.response?.data?.message || 'Registration failed' })
            )
            .finally(() => setSubmitting(false));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting
        }) => (
          <form noValidate onSubmit={handleSubmit} {...rest}>
            <Box mt={3}>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.mobile && Boolean(errors.mobile)}
                    helperText={touched.mobile && errors.mobile}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Experience (Years)"
                    name="experience"
                    type="number"
                    value={values.experience}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1">Skills</Typography>

                  {values.skills.map((skill, index) => (
                    <Box key={index} display="flex" alignItems="center" mt={1}>
                      <TextField
                        fullWidth
                        name={`skills[${index}]`}
                        value={skill}
                        onChange={handleChange}
                        error={Boolean(errors.skills?.[index])}
                        helperText={errors.skills?.[index]}
                      />
                      <IconButton
                        color="error"
                        onClick={() =>
                          setFieldValue(
                            'skills',
                            values.skills.filter((_, i) => i !== index)
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}

                  <Button
                    startIcon={<AddIcon />}
                    sx={{ mt: 1 }}
                    onClick={() => setFieldValue('skills', [...values.skills, ''])}
                  >
                    Add Skill
                  </Button>
                </Grid>

                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button fullWidth type="submit" disabled={isSubmitting} variant="contained">
                    Register
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button component={Link} to="/seekerlogin" fullWidth>
                    Already have an account? Login
                  </Button>
                </Grid>

              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
