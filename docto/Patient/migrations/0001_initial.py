<<<<<<< HEAD
# Generated by Django 5.1.3 on 2025-02-04 05:18
=======
# Generated by Django 5.1.5 on 2025-02-04 04:39
>>>>>>> c42df689fa7a652fd2bd9f06796f4e7baa1f61e2

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
<<<<<<< HEAD
                ('Age', models.IntegerField(default=1)),
                ('city', models.CharField(max_length=100)),
                ('Gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], max_length=100)),
=======
                ('Age', models.IntegerField(null=True)),
                ('Gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], max_length=100)),
                ('City', models.CharField(max_length=100)),
>>>>>>> c42df689fa7a652fd2bd9f06796f4e7baa1f61e2
                ('Doctor', models.CharField(max_length=100)),
                ('RecNo', models.CharField(max_length=100)),
                ('Fee', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('ConsultationFee', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('FeeType', models.CharField(max_length=100)),
            ],
        ),
    ]
