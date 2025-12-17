using Microsoft.AspNetCore.Mvc;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageUploadController(
        IWebHostEnvironment webHostEnvironment
    ) : ControllerBase
{

    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        try
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            string webRootPath = webHostEnvironment.WebRootPath;
            string absolutePath = Path.Combine(webRootPath, "images", file.FileName);

            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Ok(new { filePath = file.FileName });

        }
        catch
        {
            return StatusCode(500);
        }
    }

}