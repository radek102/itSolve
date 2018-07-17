using AutoMapper;
using AutoMapper.Configuration;
using Backend.DatabaseModels;

namespace Backend.Dtos
{
    public class DtoMapping
    {
        public static void Initialize()
        {
            var cfg = new MapperConfigurationExpression();
            cfg.CreateMap<Category, CategoryDto>();
            cfg.CreateMap<CategoryDto, Category>();

            cfg.CreateMap<Category, CategoryNodeDto>();
            cfg.CreateMap<CategoryNodeDto, Category>();

            cfg.CreateMap<Product, ProductDto>();
            cfg.CreateMap<ProductDto, Product>();

            Mapper.Initialize(cfg);
        }
    }
}