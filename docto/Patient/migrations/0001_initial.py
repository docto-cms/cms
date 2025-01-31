# Generated by Django 5.1.5 on 2025-01-30 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('RegistrationId', models.CharField(max_length=100, unique=True)),
                ('FirstName', models.CharField(max_length=100)),
                ('LastName', models.CharField(max_length=100)),
                ('PhoneNumber', models.CharField(max_length=15)),
                ('Email', models.EmailField(max_length=100)),
                ('Age', models.IntegerField()),
                ('Gender', models.CharField(max_length=100)),
                ('Doctor', models.CharField(max_length=100)),
                ('Fee', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('ConsultationFee', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('FeeType', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]
