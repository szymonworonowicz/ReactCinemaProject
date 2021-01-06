import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { getFilms } from '../redux/film/filmActions';
import { getHalls } from '../redux/halls/hallsActions'
import Loader from './Loader';
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
const DropDownStyle = {
    height:'30px',
    background: 'white'

};
const DropDownElementStyle = {
    fontsize:'25px',
}


function ScreeningForm(props) {
    const { screening, closeModalFn } = props;
    const { loading, films,error } = useSelector(state => state.filmsState);
    const { halls } = useSelector(state => state.hallsState);
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getFilms());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getHalls());
    },[dispatch]);

    if(loading) return <Loader />;

    if(error) return <p>Error: {error}</p>

    const initialValues = {
       time:screening.startTime,
       filmId:screening.filmId,
       hallId:screening.hallId
    };
    
    const validationSchema = Yup.object({
        filmName: Yup.string().required('Required'),
        time: Yup.date().min(new Date())
                                    .max(new Date('01-01-2050'))
                                    .required('Required'),
        hallId: Yup.string().required('Required'),
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
                    <Field
                        component="select"
                        id="filmId"
                        name="filmId"
                        style={DropDownStyle}>
                    {
                        films.map(film => {
                            return (
                                <option key={film.id} value={film.id} style={DropDownElementStyle}>
                                    {film.id} {film.title}
                                </option>
                            )
                        })
                    }

                    </Field>
                    <FormikTextField
                        type="date"
                        id="time"
                        name="time"
                        margin="normal"
                    />

                    <Field
                    component="select"
                    id="hallId"
                    name="hallId"
                    style={DropDownStyle}>
                        {
                            halls.map(hall => {
                                return (
                                    <option key={hall.id} value={hall.id} style={DropDownElementStyle}>
                                        Sala numer {hall.id}
                                    </option>
                                )
                            })
                        }
                    </Field>
                    <Button
                        style={{ marginTop: '32px' }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        //disabled={!formik.isValid}
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
    screening: PropTypes.shape({
        // maybe here we can add custom props function to check for minimal length or smth like this
        filmId: PropTypes.string.isRequired,
        startTime: PropTypes.instanceOf(new Date()),
        hallId: PropTypes.string
    }),
};

// when we are adding a new movie we don't have to pass any props
ScreeningForm.defaultProps = {
    screening: {
        startTime: new Date(),
        hallId: '1',
        filmId: '1',
    },
};

export default ScreeningForm;