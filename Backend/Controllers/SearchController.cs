using Microsoft.AspNetCore.Mvc;
using Nest;
using System;
using System.Linq;
using Backend.Models;

namespace Backend.Controllers
{
[ApiController]
public class SearchController : ControllerBase
{
    private readonly IElasticClient _elasticClient;

    public SearchController(IElasticClient elasticClient)
    {
        _elasticClient = elasticClient;
    }

    [HttpGet("/search")]
    public IActionResult SearchAutocomplete(string q)
    {
        if (string.IsNullOrWhiteSpace(q))
            return BadRequest("Query parameter 'q' is required.");

        var response = _elasticClient.Search<Search>(s => s
            .Query(qs => qs
                .Match(m => m
                    .Field(f => f.Title)
                    .Query(q)
                )
            )
            .Size(10)
        );

        var results = response.Hits.Select(hit => hit.Source.Title).ToList();
        return Ok(results);
        }   
    }
}