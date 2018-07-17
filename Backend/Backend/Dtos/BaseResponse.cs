using Backend.Enums;
using Backend.Providers;

namespace Backend.Dtos
{
    public class BaseResponse
    {
        public string Message;
        public bool Success;

        public static BaseResponse CreateOkResponse(ITranslationProvider translationProvider)
        {
            return new BaseResponse
            {
                Message = translationProvider.GetTranslation(Translations.EverythingOk).Text,
                Success = true
            };
        }
        
        public static BaseResponse CreateNotFoundResponse(long id, ITranslationProvider translationProvider)
        {
            BaseResponse response = new BaseResponse();
            response.Success = false;
            response.Message = string.Format(translationProvider.GetTranslation(Translations.ItemWithIdXNotFound).Text, id);
            return response;
        }
    }
}