import datetime
import json

from mongoengine import \
    Document, StringField, DateTimeField, ReferenceField, ListField, CASCADE, IntField

class Task(Document):
    name = StringField(required=True)
    description = StringField(required=True)
    instructions = StringField(required=True)

    def to_dict(self, path=None):
        d = {
            "id": str(self.pk),
            "name": self.name,
            "description": self.description,
            "instructions": self.instructions,
        }
        if path:
            server_url = path + str(self.pk) + '/'
            d.update({
                'url': server_url
            })
        return d
