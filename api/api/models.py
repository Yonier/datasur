from django.db import models

class Empresa(models.Model):
  id = models.AutoField(primary_key=True)
  rut = models.CharField(max_length=20, unique=True)
  razon_social = models.CharField(max_length=255)
  actividad_economica = models.CharField(max_length=255)
  fecha_inicio_actividades = models.DateField()
  region = models.CharField(max_length=255)
  provincia = models.CharField(max_length=255)
  comuna = models.CharField(max_length=255)

  def __str__(self):
    return self.razon_social