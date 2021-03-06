import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { getFilms } from "../redux/film/filmActions";
import { getHalls } from "../redux/halls/hallsActions";
import Loader from "./Loader";
// this is just styled input fields
import { TextField } from 'formik-material-ui';
import { DateTimePicker } from "formik-material-ui-pickers";
import { Button, MenuItem } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { pl } from "date-fns/locale";
import * as Yup from "yup";
import {
  addScreening,
  updateScreening,
} from "../redux/screening/screeningActions";

const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

const FormStyle = {
  marginBottom: "16px",
  background: "white",
  display: "flex",
  flexDirection: "column",
};

function ScreeningForm(props) {
  const { screening, closeModalFn } = props;
  const { loading, films, error } = useSelector((state) => state.filmsState);
  const { halls } = useSelector((state) => state.hallsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHalls());
  }, [dispatch]);

  if (loading) return <Loader />;

  if (error) return <p>Error: {error}</p>;

  const initialValues = {
    time: screening.startTime,
    filmId: screening.filmId,
    hallId: screening.hallId,
  };

  const validationSchema = Yup.object({
    filmId: Yup.string().required("Required"),
    time: Yup.date()
      .min(new Date())
      .max(new Date("2050-01-01T00:00:00"))
      .required("Required"),
    hallId: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    if (isObjectEmpty(screening)) {
      dispatch(addScreening(values));
    } else {
      const updatedScreening = {
        ...screening,
        ...values,
        film: films.find(f => f.id === values.filmId),
        startTime: values.time.toString(),
      };

      // console.log({ updatedScreening });
      dispatch(updateScreening(updatedScreening));
    }

    closeModalFn();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form style={FormStyle}>
          <Field
            component={TextField}
            select
            id="filmId"
            name="filmId"
            label="Film"
          >
            {films.map((film) => {
              return (
                <MenuItem
                  key={film.id}
                  value={film.id}
                >
                  {film.id} {film.title}
                </MenuItem>
              );
            })}
          </Field>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
            <Field
              component={DateTimePicker}
              id="time"
              name="time"
              margin="normal"
              label="Data"
            />
          </MuiPickersUtilsProvider>
          <Field
            component={TextField}
            select
            id="hallId"
            name="hallId"
            label="Sala"
          >
            {halls.map((hall) => {
              return (
                <MenuItem
                  key={hall.id}
                  value={hall.id}
                >
                  Sala numer {hall.id}
                </MenuItem>
              );
            })}
          </Field>
          <Button
            style={{ marginTop: "32px" }}
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
  screening: PropTypes.shape({
    // maybe here we can add custom props function to check for minimal length or smth like this
    filmId: PropTypes.number,
    startTime: PropTypes.string,
    hallId: PropTypes.number,
  }),
};

// when we are adding a new movie we don't have to pass any props
ScreeningForm.defaultProps = {
  screening: {
    startTime: new Date().toString(),
    hallId: 0,
    filmId: 0,
  },
};

export default ScreeningForm;
