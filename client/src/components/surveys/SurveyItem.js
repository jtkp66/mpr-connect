import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteSurvey } from "../../actions/survey";

const SurveyItem = ({
  addLike,
  removeLike,
  deleteSurvey,
  auth,
  survey: { _id, text, name, user, date },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <Link to={`/surveys/${_id}`} className="btn btn-primary">
            View Survey{" "}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteSurvey(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

SurveyItem.defaultProps = {
  showActions: true
};

SurveyItem.propTypes = {
  survey: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteSurvey: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteSurvey }
)(SurveyItem);
