using Application;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistant;
using Persistant.Interface;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//اضافه کردن سرویس مدیت آر
builder.Services.AddMediatR(typeof(List.Handler).Assembly);

//اینترفیس ها
#region Interface Service
builder.Services.AddScoped<IActivitiesService, ActivitiesService>();
builder.Services.AddScoped<IDataContext, DataContext>();
#endregion

//AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

//دسترسی از طریق پالیسی
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();

app.Run();
