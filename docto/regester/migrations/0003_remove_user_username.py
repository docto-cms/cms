# Generated by Django 5.1.5 on 2025-01-23 16:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('regester', '0002_alter_user_clinic_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
    ]
