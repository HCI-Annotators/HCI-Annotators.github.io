from flask import Response, request
from flask_restful import Resource
from mongoengine import DoesNotExist, Q
import models
import json

class TaskListEndpoint(Resource):
    def queryset_to_serialized_list(self, queryset):
        serialized_list = [
            item.to_dict() for item in queryset
        ]
        return serialized_list

    def get(self):
        #post_id = request.args.get('post_id')
        data = models.Task.objects
        # formatting the output JSON
        data = self.queryset_to_serialized_list(data)
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):
        body = request.get_json()
        task = models.Task(**body).save()
        serialized_data = {
            'id': str(task.id),
            'message': 'Comment {0} successfully created.'.format(task.id)
        }
        return Response(json.dumps(serialized_data), mimetype="application/json", status=201)

class TaskDetailEndpoint(Resource):
    def put(self, id):
        task = models.Task.objects.get(id=id)
        request_data = request.get_json()
        task.name = request_data.get('name')
        task.author = request_data.get('author')
        task.description = request_data.get('description')
        task.num_images = request_data.get('num_images')
        task.save()
        return Response(task.to_json(), mimetype="application/json", status=200)

    def delete(self, id):
        task = models.Task.objects.get(id=id)
        task.delete()
        serialized_data = {
            'message': 'Comment {0} successfully deleted.'.format(id)
        }
        return Response(json.dumps(serialized_data), mimetype="application/json", status=200)

    def get(self, id):
        task = models.Task.objects.get(id=id)
        return Response(task.to_json(), mimetype="application/json", status=200)

def initialize_routes(api):
    api.add_resource(TaskListEndpoint, '/api/tasks', '/api/tasks/')
    api.add_resource(TaskDetailEndpoint, '/api/tasks/<id>', '/api/tasks/<id>/')
