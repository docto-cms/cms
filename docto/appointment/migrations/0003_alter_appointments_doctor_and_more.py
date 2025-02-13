# Generated by Django 5.1.5 on 2025-02-13 05:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Patient', '0003_doctor_alter_patient_doctor'),
        ('appointment', '0002_doctor_alter_appointments_doctor_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointments',
            name='Doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Patient.doctor'),
        ),
        migrations.AlterField(
            model_name='patientappointment',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Patient.doctor'),
        ),
        migrations.DeleteModel(
            name='Doctor',
        ),
    ]
