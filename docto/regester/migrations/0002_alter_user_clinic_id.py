# Generated by Django 5.1.5 on 2025-01-23 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('regester', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='clinic_id',
            field=models.IntegerField(unique=True),
        ),
    ]
