from rest_framework import generics, viewsets
from rest_framework.views import APIView
from api.models import Empresa
from api.serializers import EmpresaSerializer
from rest_framework import filters

# from django.contrib.auth.models import User

class EmpresasEndPoint(viewsets.ModelViewSet):
  queryset = Empresa.objects.all().order_by('-id')
  serializer_class = EmpresaSerializer
  filter_backends = [filters.SearchFilter]
  search_fields = ['rut', 'razon_social', 'fecha_inicio_actividades']