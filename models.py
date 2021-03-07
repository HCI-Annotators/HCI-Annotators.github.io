import datetime
import json

from mongoengine import \
    Document, StringField, DateTimeField, ReferenceField, ListField, CASCADE, IntField

class Task(Document):
    name = StringField(required=True)
    description = StringField(required=True)
    instructions = StringField(required=True)
    s3_link = StringField(required=True)

    def to_dict(self, path=None):
        d = {
            "description": self.description,
            "id": str(self.pk),
            "instructions": self.instructions,
            "name": self.name,
            "s3_link": self.s3_link,
        }
        if path:
            server_url = path + str(self.pk) + '/'
            d.update({
                'url': server_url
            })
        return d
