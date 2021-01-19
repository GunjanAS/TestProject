import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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

      <React.Fragment>
        <h2>Test Project</h2>

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
                  <label > <h5>N:</h5> </label>
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
                    <div className="col">
                      < Button
                        variant="info"
                        type="button"
                        className="addbutton"
                        onClick={() => push({ ColumnName: '', Input: '', Domain: '' })}
                      >
                        Add Another Column
                          </Button>

                    </div>


                    {values.addingcolumns.length > 0 &&
                      values.addingcolumns.map((column, index) => (
                        <div className="row" key={index} >

                          <div className="userInputts">
                          <div className="col__userinputs">
                              <Button
                                variant="dark"
                                // type="button"
                                className="secondary btn-sm"
                                onClick={() => remove(index)}
                              >
                                X
                        </Button>
                            </div>
                            <div className="col__userinputs">

                              <label htmlFor={`addingcolumns.${index}.Domain`} ><h5>Type: </h5>   </label>
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
                              <label htmlFor={`addingcolumns.${index}.ColumnName`}><h5>Attribute Name:</h5> </label>
                              <Field className="button__field"
                                name={`addingcolumns.${index}.ColumnName`}
                                type="text"
                                placeholder="State or Percentage"
                              />
                              <ErrorMessage
                                name={`addingcolumns.${index}.ColumnName`}
                                component="div"
                                className="field-error"
                              />

                            </div>
                            <div className="col__userinputs">

                              <label htmlFor={`addingcolumns.${index}.Input`} ><h5>Domain:</h5> </label>
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






                        </div>
                      ))}

                  </div>
                )}
              </FieldArray>
              <div className="col">
                <Button className="app__button" type="submit" ref={btnRef} ><h4>Generate</h4></Button>

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
