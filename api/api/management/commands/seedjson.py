import json
import os
from django.core.management.base import BaseCommand
from ...models import Empresa

class Command(BaseCommand):
  def handle(self, *args, **options):
    cwd = os.getcwd() + "/seed"

    api_empresa = cwd + "/api_empresa.json"
    with open(api_empresa, 'r') as file:
      data = json.load(file)

    for item in data:
      Empresa.objects.create(**item)  # Replace with your model name

    print("SEED - OK")