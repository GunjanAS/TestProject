import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Jumbotron from 'react-bootstrap/Jumbotron';
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const initialValues = {
    N: 0,
    addingcolumns: [
      {
        ColumnName: '',
        Input: '',
        Domain: ''
      },
    ],
  };
  let btnRef = useRef();

  const fieldvalidations =
    Yup.object().shape({
      N: Yup
        .number()
        .positive()
        .integer()
        .required("Required!"),
      addingcolumns: Yup.array()
        .of(
          Yup.object().shape({
            ColumnName: Yup.string().required("Column Name is Required!!"),
            Input: Yup.string().required("Input is Required!!"),
            Domain: Yup.string().required("Type is Required!!")
          }))
    });

  return (
    <div className="app">
      
        <h1 className="header">Test Project</h1>
        
      
      <React.Fragment>

        <Formik
          initialValues={initialValues}
          validationSchema={fieldvalidations}
          onSubmit={async (values) => {
            if (btnRef.current) {
              btnRef.current.setAttribute("disabled", "disabled");
            }
            let response = await fetch(`http://${window.location.hostname}:5000/api/addingColumns`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ values: values })
            });
            response = await response.json();
            console.log(response);

            let downloadDiv = document.getElementById("downloadDiv");
            let aTag = document.createElement('a');
            aTag.setAttribute('href', response.downloadLink);
            aTag.innerText = "Download!!";
            downloadDiv.appendChild(aTag);
            aTag.click();
            aTag.remove();
            btnRef.current.removeAttribute("disabled");
          }}
        >
          {({ values }) => (
            <Form className="formDiv">
              <div className="col">
                <div className="col__N">
                  <label >N: </label>
                  <Field className="button__field" type="number" name="N" placeholder="N" />
                  <ErrorMessage
                    name={`N`}
                    component="div"
                    className="field-error"
                  />
                </div>

              </div>
              <FieldArray name="addingcolumns">
                {({ insert, remove, push }) => (

                  <div>

                    {values.addingcolumns.length > 0 &&
                      values.addingcolumns.map((column, index) => (
                        <div className="row" key={index} >
                          <div className="userInputts">
                            <div className="col__userinputs">

                              <label htmlFor={`addingcolumns.${index}.Domain`} >Type: </label>
                              <Field component="select" name={`addingcolumns.${index}.Domain`}>
                                <option value="">Select</option>
                                <option value="0">String</option>
                                <option value="1">Integer Range</option>
                              </Field>
                              <ErrorMessage
                                name={`addingcolumns.${index}.Domain`}
                                component="div"
                                className="field-error"
                              />

                            </div>
                            <div className="col__userinputs">
                              <FormGroup>

                                <FormLabel htmlFor={`addingcolumns.${index}.ColumnName`} >Attribute Name: </FormLabel>
                                <FormControl className="button__field"
                                  name={`addingcolumns.${index}.ColumnName`}
                                  type="text"
                                  placeholder="State or Percentage"
                                />
                                <ErrorMessage
                                  name={`addingcolumns.${index}.ColumnName`}
                                  component="div"
                                  className="field-error"
                                />
                              </FormGroup>

                            </div>
                            <div className="col__userinputs">

                              <label htmlFor={`addingcolumns.${index}.Input`} >Domain: </label>
                              <Field className="button__field"
                                name={`addingcolumns.${index}.Input`}
                                type="text"
                                placeholder="NJ,NY,PA or 0,100 "
                              />
                              <ErrorMessage
                                name={`addingcolumns.${index}.Input`}
                                component="div"
                                className="field-error"
                              />

                            </div>
                          </div>

                          <div className="col">
                            <Button
                              variant="dark"
                              className="addbutton"
                              onClick={() => push({ ColumnName: '', Input: '', Domain: '' })}
                            >
                              Add Another Column
                          </Button>
                          </div>

                          <div className="col">
                            <button
                              type="button"
                              className="secondary"
                              onClick={() => remove(index)}
                            >
                              Remove Column
                        </button>
                          </div>
                        </div>
                      ))}

                  </div>
                )}
              </FieldArray>
              <div className="col">
                <button className="app__button" type="submit" ref={btnRef} >Generate</button>

              </div>

            </Form>
          )}
        </Formik>
      </React.Fragment>
      <React.Fragment>
        <div>
          <div id="downloadDiv"></div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default App;
