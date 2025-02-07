# Generated by Django 5.1.5 on 2025-02-07 04:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('RegistrationId', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('FirstName', models.CharField(max_length=100)),
                ('LastName', models.CharField(max_length=100)),
                ('PhoneNumber', models.IntegerField()),
                ('Email', models.EmailField(max_length=100)),
                ('Age', models.IntegerField(null=True)),
                ('Gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], max_length=100)),
                ('City', models.CharField(max_length=100)),
                ('Doctor', models.CharField(max_length=100)),
                ('RefferedBy', models.CharField(max_length=100)),
                ('Fee', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('ConsultationFee', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('FeeType', models.CharField(max_length=100)),
            ],
        ),
    ]
