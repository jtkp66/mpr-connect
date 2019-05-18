import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import SurveyItem from "./SurveyItem";
import { getSurveys } from "../../actions/survey";
import SurveyForm from "./SurveyForm";

const Surveys = ({ getSurveys, survey: { surveys, loading } }) => {
  useEffect(() => {
    getSurveys();
  }, [getSurveys]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Surveys</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <SurveyForm />
      <div className="surveys">
        {surveys.map(survey => (
          <SurveyItem key={survey._id} survey={survey} />
        ))}
      </div>
    </Fragment>
  );
};

Surveys.propTypes = {
  getSurveys: PropTypes.func.isRequired,
  survey: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  survey: state.survey
});

export default connect(
  mapStateToProps,
  { getSurveys }
)(Surveys);
