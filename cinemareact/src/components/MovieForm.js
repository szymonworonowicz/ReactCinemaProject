import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
// this is just styled input fields
import { FormikTextField } from 'formik-material-fields';
import { Button } from '@material-ui/core'
import * as Yup from 'yup';
import { addFilm } from '../redux/film/filmActions';

const FormStyle = {
    marginBottom: '16px',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
};

function MovieForm(props) {
    const { film, closeModalFn } = props;

    const initialValues = {
        title: film.title,
        time: film.time,
        director: film.director,
        description: film.description,
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Required'),
        // TODO: minmax validation
        time: Yup.number().required('Required'),
        director: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
    });

    const handleSubmit = values => {
        closeModalFn();

        // TODO: dispatch redux action for adding film
        console.log(values);
    }

    console.log(initialValues);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {formik => (
                <Form style={FormStyle}>
                    <FormikTextField
                        type="text"
                        id="title"
                        name="title"
                        label="Tytuł filmu"
                    />
                    <FormikTextField
                        type="number"
                        id="time"
                        name="time"
                        label="Czas trwania"
                        margin="normal"
                    />
                    <FormikTextField
                        type="text"
                        id="director"
                        name="director"
                        label="Reżyser"
                        margin="normal"
                    />
                    <FormikTextField
                        id="description"
                        name="description"
                        label="Opis filmu"
                        margin="normal"
                        multiline
                        rows={5}
                    />
                    <Button
                        style={{ marginTop: '32px' }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!formik.isValid}
                    >
                        Zapisz
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

MovieForm.propTypes = {
    closeModalFn: PropTypes.func.isRequired,
    film: PropTypes.shape({
        // maybe here we can add custom props function to check for minimal length or smth like this
        id: PropTypes.number,
        title: PropTypes.string,
        time: PropTypes.number,
        director: PropTypes.string,
        description: PropTypes.string,
    }),
};

// when we are adding a new movie we don't have to pass any props
MovieForm.defaultProps = {
    film: {
        title: '',
        time: 0,
        director: '',
        description: '',
    },
};

export default MovieForm;