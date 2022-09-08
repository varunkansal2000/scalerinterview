import json

from flask import Flask, request, jsonify,render_template,flash,redirect, url_for,send_file
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from io import BytesIO
from flask_cors import CORS
from rest_framework import serializers

from sqlalchemy.ext.declarative import DeclarativeMeta

# Init app
app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "secret"




# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_NOTIFICATIONS']=False


# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)


#InterviewTime Class/Model
class InterviewTime(db.Model):
    __tablename__ = "interviewtime"
    id=db.Column(db.Integer, primary_key=True)
    date=db.Column(db.String(100))
    stime=db.Column(db.String(100))
    etime=db.Column(db.String(100))
    participant_id = db.Column(db.Integer, db.ForeignKey('participant.id')) #refrencing paricipant id
    following2 = db.relationship('Participant')



# Participant Class/Model
class Participant(db.Model):
  __tablename__ = "participant"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  email = db.Column(db.String(100),unique=True)







# Participant Schema
class ParticipantSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'email')

class InterviewSchema(ma.Schema):
  class Meta:
    fields = ('id', 'date', 'stime', 'etime', 'participant_id')

class InterviewPartSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'email', 'data', 'date', 'stime', 'etime', 'participant_id')

# Init schema
participant_schema = ParticipantSchema()
participants_schema = ParticipantSchema(many=True)
interview_schema = InterviewSchema()
interviews_schema = InterviewSchema(many=True)
interviewpartschema=InterviewPartSchema()
interviewpartschemas=InterviewPartSchema(many=True)

#create tables before
@app.before_first_request
def create_tables():
    db.create_all()


# Get All interviewtime with time
@app.route('/interviewtt/<id>', methods=['GET'])
def get_interviewstt(id):
  all_interview = InterviewTime.query.filter_by(participant_id=id).all()
  result = interviews_schema.dump(all_interview)
  return result

#get all interview
@app.route('/interviewt/<id>', methods=['GET'])
def get_interviewst(id):
  all_interview = InterviewTime.query.filter_by(id=id)
  result = interviews_schema.dump(all_interview)
  print(result[0])
  return result[0]


# Get All Participant with time
@app.route('/participant', methods=['GET'])
def get_participants():

  all_partcipant = Participant.query.all()

  result = participants_schema.dump(all_partcipant)
  return result

#join both the tables on key
@app.route('/joined', methods=['GET'])
def get_joined():
    rows=db.session.query(Participant,InterviewTime).join(InterviewTime).all()

    return render_template('admin_list.html', title='Basic Table',rows=rows)




# Get Single Participant
@app.route('/participant/<id>', methods=['GET'])
def get_participant(id):
  participant = Participant.query.get(id)

  if participant is None:
    return{'error':'Not Found'},404
  else:
    return participant_schema.jsonify(participant)

@app.route('/download/<upload_id>', methods=["GET"])
def download(upload_id):
    download = Participant.query.filter_by(id=upload_id).first()
    if download is None:
        return {'error': 'Not Found'}, 404
    else:
        return send_file(BytesIO(download.data), download_name=download.file, as_attachment=True)

# Create a Participant
@app.route('/participant', methods=['POST'])
def add_participant():
          nam=request.get_json('name')
          print(nam['email'])
          name = nam['name']
          email = nam['email']

          print(name);




          new_particpant = Participant(name=name, email=email)


          db.session.add(new_particpant)
          db.session.commit()


          return participant_schema.jsonify(new_particpant)

#creating interviewtime db
@app.route('/interviewadd/<id>/<etime>/<stime>/<date>', methods=['POST'])
def add_interview(id,etime,stime,date):

          participant = Participant.query.get(id)
          tt=InterviewTime.query.filter_by(participant_id=id).all()
          if participant is None:
              return {'error': 'there is a no user corresponding to the key'}

          else:

              for t in tt:
                  print(t)

                  if t is not None:
                      if(t.date==date and (((t.stime<=stime)and(stime<t.etime))or((t.stime<etime)and(etime<=t.etime)))):
                          return{'error':'The metting cannot be scheduled as the participant already had a meeting'}

              participant_id = id

              new_interview = InterviewTime(date=date, stime=stime, etime=etime, participant_id=participant_id)

              db.session.add(new_interview)
              db.session.commit()

              return interview_schema.jsonify(new_interview)


# Update a Participant with time
@app.route('/participant/<id>/<name>/<email>', methods=['PUT'])
def update_participant(id,name,email):

      participant = Participant.query.get(id)
      if participant is None:
        return{'error':'Not Found'},404





      participant.name = name
      participant.email = email




      db.session.commit()

      return participant_schema.jsonify(participant)

#update participant time
@app.route('/participanttime/<id>/<date>/<etime>/<stime>', methods=['PUT'])
def update_tt(id,date,etime,stime):


      tt=InterviewTime.query.get(id)
      participant = Participant.query.get(tt.participant_id)
      if participant is None:
        return{'error':'Not Found'},404





      tt.date = date
      tt.stime = stime
      tt.etime = etime



      db.session.commit()

      return participant_schema.jsonify(tt)
# Delete Participant with time
@app.route('/participant/<id>', methods=['DELETE'])
def delete_participant(id):
  participant = Participant.query.get(id)
  if participant is None:
    return{'error':'Not Found'},404
  delete_partinterview(id)
  db.session.delete(participant)
  db.session.commit()

  return participant_schema.jsonify(participant)

#interview deletion with participant id
def delete_partinterview(id):
  interviews = InterviewTime.query.filter_by(participant_id=id).all()

  if interviews is None:
    return{'error':'Not Found'},404

  for interview in interviews:
        db.session.delete(interview)
  db.session.commit()


# Delete Participant with time
@app.route('/interviewtt/<id>', methods=['DELETE'])
def delete_interview(id):
  print(id)
  interview = InterviewTime.query.get(id)
  if interview is None:
    return{'error':'Not Found'},404
  db.session.delete(interview)
  db.session.commit()

  return interview_schema.jsonify(interview)




# Run Server
if __name__ == '__main__':
  app.run(debug=True)