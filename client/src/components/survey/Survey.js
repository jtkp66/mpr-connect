import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getSurvey } from "../../actions/survey";
import SurveyItem from "../surveys/SurveyItem";
import { Link } from "react-router-dom";

const Survey = ({ getSurvey, survey: { survey, loading }, match }) => {
  useEffect(() => {
    getSurvey(match.params.id);
  }, [getSurvey, match]);
  return loading || survey === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/surveys" className="btn">
        Back to Surveys
      </Link>
      <SurveyItem survey={survey} showActions={false} />
    </Fragment>
  );
};

Survey.propTypes = {
  getSurvey: PropTypes.func.isRequired,
  survey: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  survey: state.survey
});

export default connect(
  mapStateToProps,
  { getSurvey }
)(Survey);
