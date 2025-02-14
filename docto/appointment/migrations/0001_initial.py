<<<<<<< HEAD
# Generated by Django 5.1.5 on 2025-02-13 09:45
=======
# Generated by Django 5.1 on 2025-02-13 06:07
>>>>>>> 70b7833949c75b31d479ccaf3ec1036f87ac72fe

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Patient', '0001_initial'),
    ]

    operations = [
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
                ('status', models.CharField(choices=[('Canceled', 'Canceled'), ('Done', 'Done'), ('Engaged', 'Engaged'), ('Waiting', 'Waiting'), ('Scheduled', 'Scheduled')], default='Scheduled', max_length=50)),
                ('Doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Patient.doctor')),
                ('Patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Patient.patient')),
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
                ('status', models.CharField(choices=[('Decline', 'Decline'), ('Accept', 'Accept'), ('Waiting', 'Waiting')], default='Waiting', max_length=50)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Patient.doctor')),
            ],
        ),
    ]
