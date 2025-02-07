# Generated by Django 5.1.5 on 2025-02-07 04:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Patient', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=255)),
                ('lastname', models.CharField(max_length=255)),
                ('specialization', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Appointments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Date', models.DateTimeField()),
                ('Duration', models.PositiveIntegerField(choices=[(5, '5'), (10, '10'), (15, '15'), (20, '20'), (25, '25'), (30, '30'), (35, '35'), (40, '40'), (45, '45'), (50, '50'), (55, '55'), (60, '60')])),
                ('Repeat', models.BooleanField(default=False)),
                ('Treatment', models.TextField(blank=True, null=True)),
                ('AppointmentType', models.CharField(choices=[('scheduled', 'Scheduled'), ('walkin', 'Walkin'), ('phone_online', 'Phone/Online')], max_length=100)),
                ('Notes', models.TextField(blank=True, null=True)),
                ('GoogleMeetLink', models.URLField(blank=True, null=True)),
                ('status', models.IntegerField(choices=[(0, 'Canceled'), (1, 'Done'), (2, 'Engaged'), (3, 'Waiting'), (4, 'Scheduled')], default=4)),
                ('Patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Patient.patient')),
                ('Doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointment.doctor')),
            ],
        ),
        migrations.CreateModel(
            name='PatientAppointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('mobile_number', models.CharField(max_length=15)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('treatment', models.TextField(blank=True, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('date', models.DateTimeField()),
                ('duration', models.IntegerField(default=15)),
                ('status', models.IntegerField(choices=[(0, 'Decline'), (1, 'Accept'), (2, 'Waiting')], default=2)),
                ('doc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patientappoinments', to='appointment.doctor')),
            ],
        ),
    ]
