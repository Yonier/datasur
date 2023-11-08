from rest_framework import serializers
from .models import Empresa

class EmpresaSerializer(serializers.HyperlinkedModelSerializer):
  id = serializers.ReadOnlyField()
  class Meta:
    model = Empresa
    fields = '__all__'