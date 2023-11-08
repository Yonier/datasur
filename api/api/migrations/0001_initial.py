# Generated by Django 4.2.7 on 2023-11-08 00:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Empresa',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('rut', models.CharField(max_length=20, unique=True)),
                ('razon_social', models.CharField(max_length=255)),
                ('actividad_economica', models.CharField(max_length=255)),
                ('fecha_inicio_actividades', models.DateField()),
                ('region', models.CharField(max_length=255)),
                ('provincia', models.CharField(max_length=255)),
                ('comuna', models.CharField(max_length=255)),
            ],
        ),
    ]
