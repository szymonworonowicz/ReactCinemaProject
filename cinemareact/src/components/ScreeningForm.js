import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
// this is just styled input fields
import { FormikTextField } from 'formik-material-fields';
import { Button } from '@material-ui/core'
import * as Yup from 'yup';
import { addScreening, updateScreening } from '../redux/screening/screeningActions';

const isObjectEmpty = obj => Object.keys(obj).length === 0;

const FormStyle = {
    marginBottom: '16px',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
};

function ScreeningForm(props) {
    const { screening, closeModalFn } = props;
    const dispatch = useDispatch();

    const initialValues = {
       time:screening.startTime,
       filmName:screening.film.title,
       hallId:screening.hallId
    };

    const validationSchema = Yup.object({
        filmName: Yup.string().required('Required'),
        time: Yup.number().positive('Time cannot be a negative number').required('Required'),
        hallId: Yup.number().required('Required'),
    });

    const handleSubmit = values => {
        if(isObjectEmpty(screening)) {
            dispatch(addScreening(values));
        } else {
            const updatedScreening = {
                ...screening,
                ...values,
            };

            dispatch(updateScreening(updatedScreening));
        }

        closeModalFn();
    }

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
                        id="filmName"
                        name="filmName"
                        label="Tytuł filmu"
                    />
                    <FormikTextField
                        type="number"
                        id="time"
                        name="time"
                        label="Godzina Startu"
                        margin="normal"
                    />
                    <FormikTextField
                        type="text"
                        id="hallId"
                        name="hallId"
                        label="Numer Sali"
                        margin="normal"
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

ScreeningForm.propTypes = {
    closeModalFn: PropTypes.func.isRequired,
    film: PropTypes.shape({
        // maybe here we can add custom props function to check for minimal length or smth like this
        id: PropTypes.number,
        filmName: PropTypes.string,
        time: PropTypes.number,
        hallId: PropTypes.number
    }),
};

// when we are adding a new movie we don't have to pass any props
ScreeningForm.defaultProps = {
    film: {
        filmName: '',
        time: 0,
        hallId: 1,
    },
};

export default ScreeningForm;